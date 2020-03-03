// @flow strict
import React from 'react';
import Helmet from 'react-helmet';
import { withPrefix } from 'gatsby';
import type { Node as ReactNode } from 'react';
import { useSiteMetadata } from '../../hooks';
import styles from './Layout.module.scss';
import Scroll from '../Scroll';

type Props = {
  children: ReactNode,
  title: string,
  description?: string,
  socialImage? :string
};

const Layout = ({
  children,
  title,
  description,
  socialImage
}: Props) => {
  const { author, url } = useSiteMetadata();
  const metaImage = socialImage != null ? socialImage : author.photo;
  const metaImageUrl = url + withPrefix(metaImage);

  return (
    <React.Fragment>
      <div className={styles.layout}>
        <Helmet>
          <html lang="ko" />
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:site_name" content={title} />
          <meta property="og:image" content={metaImageUrl} />
        </Helmet>
        {children}
      </div>
      {/* <Scroll showBelow={100} css='position: fixed; right: 5vw; bottom: 5vw;' /> */}
      <Scroll showBelow={50} />
    </React.Fragment>
  );
};

export default Layout;
