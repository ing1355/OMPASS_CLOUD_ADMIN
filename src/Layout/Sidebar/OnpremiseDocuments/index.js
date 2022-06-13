import { getRedirect } from "../../../lib/redirect";

import i18nextConfig from '../../../next-i18next.config';

const getPathSlugs = () => {
  return i18nextConfig.i18n.locales.map(locale => ({
    params: {
      locale
    }
  }))
}

export async function getStaticPaths(...args) {
  const pathsWithLocale = getPathSlugs();
  return {
    paths: pathsWithLocale,
    fallback: false
  }
}

export async function getStaticProps({params}) {
  return {
    props: {
      ...params
    }
  }
}

export default getRedirect('/document/u2f-uaf')