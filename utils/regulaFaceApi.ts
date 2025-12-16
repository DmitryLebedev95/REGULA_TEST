import { APIRequestContext, APIResponse } from '@playwright/test';

/**
 * @param request - Playwright APIRequestContext
 * @param firstBase64Image - Base64 string of the first image
 * @param secondBase64Image - Base64 string of the second image
 * @returns APIResponse from the Regula Face API
 */
export async function matchFaces(
  request: APIRequestContext,
  firstBase64Image: string,
  secondBase64Image: string
): Promise<APIResponse> {
  return await request.post('https://faceapi.regulaforensics.com/api/match', {
    data: {
      outputImageParams: {
        crop: {
          type: 1,
          size: [106, 134]
        }
      },
      images: [
        {
          data: firstBase64Image,
          detectAll: true,
          index: 0,
          type: 3
        },
        {
          data: secondBase64Image,
          detectAll: true,
          index: 1,
          type: 3
        }
      ]
    }
  });
}