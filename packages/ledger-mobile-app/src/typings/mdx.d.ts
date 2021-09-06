declare module '*.mdx' {
  import * as React from 'react';

  interface MDXContentProps {
    components: any;
  }
  type MDXContentType = React.FC<MDXContentProps>;

  export const MDXContent: MDXContentType;
  export default MDXContent;
}
