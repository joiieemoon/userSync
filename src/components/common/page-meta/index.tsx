import { HelmetProvider,Helmet } from "react-helmet-async";


import { useEffect } from "react";

const PageMeta = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default PageMeta;
export const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  return <HelmetProvider>{children}</HelmetProvider>;
};