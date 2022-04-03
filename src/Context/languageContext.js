import React, {createContext, useContext} from "react";
import strings from "./../Languages/Languages";

const languageContext = createContext();
export const useLanguage = () => useContext(languageContext);

export default function LanguageProvider(props) {
  const [language, setLanguage] = React.useState(
    sessionStorage.getItem("language")
      ? sessionStorage.getItem("language")
      : "en"
  );

  const [refresh, setRefresh] = React.useState(false);

  React.useEffect(() => {
    strings.setLanguage(language);
  }, [language, refresh]);

  const isRTL = React.useMemo(() => {
    switch (language) {
      case "en":
        return false;
      case "ar":
        return true;
      case "ur":
        return true;
      case "fr":
        return false;
      default:
        return false;
    }
  }, [language]);

  const updateLanguage = (current) => {
    sessionStorage.setItem("language", current);
    strings.setLanguage(current);
    setLanguage(current);
    setRefresh(!refresh);
  };

  return (
    <languageContext.Provider value={{language, updateLanguage, isRTL}}>
      {props?.children}
    </languageContext.Provider>
  );
}
