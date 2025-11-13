export const searchBookByTitle = async (title, author = '') => {
  try {
    const query = author ? `${title} ${author}` : title;
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=5`
    );
    const data = await response.json();
    return data.docs || [];
  } catch (error) {
    console.error('Error searching books:', error);
    return [];
  }
};

export const getBookCoverUrl = (coverId, size = 'M') => {
  if (!coverId) return null;
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
};

export const getBookByISBN = async (isbn) => {
  try {
    const response = await fetch(
      `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`
    );
    const data = await response.json();
    return data[`ISBN:${isbn}`] || null;
  } catch (error) {
    console.error('Error fetching book by ISBN:', error);
    return null;
  }
};

export const extractBookInfo = (bookData) => {
  if (!bookData) return null;

  return {
    title: bookData.title || '',
    author: bookData.author_name?.[0] || '',
    isbn: bookData.isbn?.[0] || '',
    coverId: bookData.cover_i || null,
    coverUrl: bookData.cover_i ? getBookCoverUrl(bookData.cover_i) : null,
    publishYear: bookData.first_publish_year || null,
  };
};
