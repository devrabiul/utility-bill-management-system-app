import { useEffect } from 'react';

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = `${title} - UtilityBill Pro`;
  }, [title]);
};

export default useDocumentTitle;