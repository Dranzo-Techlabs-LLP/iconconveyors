import { createContext, useContext, useEffect, useState } from "react";
import { defaultContent, fetchContent, type SiteContent } from "./content";

const ContentContext = createContext<SiteContent>(defaultContent);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);

  useEffect(() => {
    fetchContent().then((c) => {
      if (c) setContent(c);
    });
  }, []);

  return (
    <ContentContext.Provider value={content}>{children}</ContentContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useContent() {
  return useContext(ContentContext);
}
