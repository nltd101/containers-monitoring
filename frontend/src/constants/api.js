import config from 'config'

const API_URL = `${config.serverUrl}/api`

export const TOKEN_API_URL = `${API_URL}/token`
export const REFRESH_TOKEN_API_URL = `${API_URL}/token/refresh`
