/* بِسْمِ اللهِ الرَّحْمنِ الرَّحِیم */

export class BaseResponse<type> {
  success!: boolean
  errorMessage!: string
  data?: type
  token?: string
  totalCount?: number
}
