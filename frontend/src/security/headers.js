export default () => {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.auth ? JSON.parse(localStorage.auth).access_token : null}`
  }
}

export function formHeader() {
  return {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Bearer ${localStorage.auth ? JSON.parse(localStorage.auth).access_token : null}`
  }
}