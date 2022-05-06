import { MailAdapter } from '../adapters/mail-adapter';
import { FeedbacksRepositories } from '../repositories/feedbacks-repositories';

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepositories,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new Error('Type is required');
    }
    if (!comment) {
      throw new Error('Comment is required');
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Screenshot type is invalid');
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendmail({
      subject: 'Novo feedback',
      body: [
        `<div style="font-family: sans-sefir, font-size: 16px; color: #111">`,
        `<p>Tipo do feedback ${type}</p>`,
        `<p>Comentário ${comment}</p>`,
        screenshot ? `<img src="${screenshot}" />` : '',
        `</div>`,
      ].join('\n'),
    });
  }
}
