import React from "react";

const SocialLink = ({ href, children }) => (
  <a href={href} target="_blank" rel="noreferrer">{children}</a>
);

export default SocialLink;
