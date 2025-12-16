import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import { matchFaces } from '../utils/regulaFaceApi';

test('Verify Face Matching API returns high similarity for same person', async ({ request }) => {
const firstImageBuffer = fs.readFileSync('testData/brad_pitt1.jpg');
const secondImageBuffer = fs.readFileSync('testData/brad_pitt2.jpg');
const firstBase64Image = firstImageBuffer.toString('base64');
const secondBase64Image = secondImageBuffer.toString('base64');

const response = await matchFaces(request, firstBase64Image, secondBase64Image);
expect(response.ok()).toBeTruthy();
const responseBody = await response.json();
expect(responseBody.results[0].similarity).toBeGreaterThan(0.74);
});