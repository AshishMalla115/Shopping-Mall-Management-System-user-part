async function readJsonOrText(res) {
  const text = await res.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

export async function apiGet(path) {
  const res = await fetch(path, { method: 'GET' })
  const body = await readJsonOrText(res)
  if (!res.ok) {
    const msg =
      body == null ? `Request failed (${res.status})` : typeof body === 'string' ? body : JSON.stringify(body)
    throw new Error(msg)
  }
  return body
}

export async function apiPost(path, data) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const body = await readJsonOrText(res)
  if (!res.ok) {
    const msg =
      body == null ? `Request failed (${res.status})` : typeof body === 'string' ? body : JSON.stringify(body)
    throw new Error(msg)
  }
  return body
}

