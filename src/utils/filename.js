export function getFilenameFromUrl(url) {
  try {
    const urlObj = new URL(url);
    // Remove www. if present and get hostname
    const domain = urlObj.hostname.replace('www.', '');
    // Replace any remaining dots with hyphens
    return domain.replace(/\./g, '-');
  } catch (error) {
    return 'website';
  }
} 