interface UploadProductImageRequest {
  productId: string;
  order: number;
}

export class UploadProductImage {
  async execute({ productId, order }: UploadProductImageRequest) {}
}
