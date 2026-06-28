export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateTime(isoString: string): string {
  return new Date(isoString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getStatusColor(status: string): string {
  return status === 'published' ? 'badge-success' : 'badge-warning';
}

export function truncate(text: string, maxLength = 80): string {
  return text.length > maxLength ? text.slice(0, maxLength) + '…' : text;
}
