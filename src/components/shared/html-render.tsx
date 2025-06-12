import React from "react";
import xss from "xss";

const HtmlRenderer = ({
  unsafeHtml,
  ...props
}: {
  unsafeHtml: string;
} & React.HTMLAttributes<HTMLDivElement>): React.ReactElement => {
  return (
    <div
      {...props}
      dangerouslySetInnerHTML={{
        __html: xss(unsafeHtml),
      }}
    />
  );
};

export default HtmlRenderer;
