export interface IMailGetData {
  readonly from?: string;
  readonly to: string;
  readonly subject: string;
  readonly html: string;
}
