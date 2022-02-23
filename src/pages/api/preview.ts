/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Prismic from '@prismicio/client';

import { Document } from '@prismicio/client/types/documents';

export const accessToken = process.env.PRISMIC_ACCESS_TOKEN;
export const apiEndPoint = process.env.PRISMIC_API_ENDPOINT;

function linkResolver(doc: Document): string {
  if (doc.type === 'posts') {
    return `/post/${doc.uid}`;
  }

  return '/';
}

const createClientOptions = (req = null, prismicAccessToken = null) => {
  const reqOption = req ? { req } : {};

  const accessTokenOption = prismicAccessToken
    ? { accessToken: prismicAccessToken }
    : {};

  return {
    ...reqOption,
    ...accessTokenOption,
  };
};

const Client = (req = null) =>
  Prismic.client(apiEndPoint, createClientOptions(req, accessToken));

const Preview = async (req, res) => {
  const { token: ref, documentId } = req.query;
  const redirectUrl = await Client(req)
    .getPreviewResolver(ref, documentId)
    .resolve(linkResolver, '/');

  if (!redirectUrl) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  res.setPreviewData({ ref });
  res.writeHead(302, { Location: `${redirectUrl}` });
  res.end();
};

export default Preview;
