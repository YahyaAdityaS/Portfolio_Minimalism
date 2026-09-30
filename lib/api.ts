export const fetchFromGAS = async <T>(url: string, cacheKey: string): Promise<T | null> => {
  try {
    const res = await fetch(`${url}?t=${Date.now()}`, {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(`Error fetching from ${cacheKey}:`, err);
    return null;
  }
};
