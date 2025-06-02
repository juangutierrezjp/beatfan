// Funciones para interactuar con la API de ArtTokens

const API_BASE_URL = "https://fanbeats.cloudycoding.com"

export interface ArtToken {
  id?: string
  name: string
  symbol: string
  platformWallet: string
  artistWallet: string
}

export interface CreateArtTokenRequest {
  name: string
  symbol: string
  platformWallet: string
  artistWallet: string
}

// Crear un nuevo ArtToken
export async function createArtToken(data: CreateArtTokenRequest): Promise<{ id: string }> {
  console.log("API call - Creating ArtToken with data:", data)

  try {
    const response = await fetch(`${API_BASE_URL}/art_token/deploy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    console.log("API response status:", response.status)
    console.log("API response ok:", response.ok)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("API error response:", errorText)
      throw new Error(`Error creating ArtToken: ${response.status} ${response.statusText} - ${errorText}`)
    }

    const text = await response.text()
    console.log("API response text:", text)

    if (!text) {
      throw new Error("Empty response from server")
    }

    let result
    try {
      result = JSON.parse(text)
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError)
      throw new Error(`Invalid JSON response: ${text}`)
    }

    console.log("Parsed API result:", result)
    return result
  } catch (error) {
    console.error("Error in createArtToken function:", error)
    throw error
  }
}

// Obtener todos los ArtTokens
export async function getAllArtTokens(): Promise<ArtToken[]> {
  try {
    console.log("Fetching all ArtTokens from:", `${API_BASE_URL}/art_token`)

    const response = await fetch(`${API_BASE_URL}/art_token`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Evitar cache para obtener datos frescos
    })

    console.log("getAllArtTokens response status:", response.status)

    if (!response.ok) {
      throw new Error(`Error fetching ArtTokens: ${response.status} ${response.statusText}`)
    }

    const text = await response.text()
    console.log("getAllArtTokens response text:", text)

    if (!text) {
      console.log("Empty response, returning empty array")
      return []
    }

    const result = JSON.parse(text)
    console.log("Parsed getAllArtTokens result:", result)

    // Asumiendo que la API devuelve un array de ArtTokens
    return Array.isArray(result) ? result : [result]
  } catch (error) {
    console.error("Error fetching ArtTokens:", error)
    // En lugar de lanzar el error, devolver array vacío para no romper la UI
    return []
  }
}

// Obtener un ArtToken específico por ID
export async function getArtTokenById(id: string): Promise<ArtToken> {
  try {
    console.log("Fetching ArtToken by ID:", id)

    const response = await fetch(`${API_BASE_URL}/art_token/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    console.log("getArtTokenById response status:", response.status)

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`ArtToken with ID ${id} not found`)
      }
      throw new Error(`Error fetching ArtToken: ${response.status} ${response.statusText}`)
    }

    const text = await response.text()
    console.log("getArtTokenById response text:", text)

    if (!text) {
      throw new Error("Empty response from server")
    }

    const result = JSON.parse(text)
    console.log("Parsed getArtTokenById result:", result)

    return { ...result, id } // Añadir el ID al resultado
  } catch (error) {
    console.error("Error fetching ArtToken:", error)
    throw error
  }
}

// Función auxiliar para verificar si un ID de ArtToken existe
export async function artTokenExists(id: string): Promise<boolean> {
  try {
    await getArtTokenById(id)
    return true
  } catch (error) {
    return false
  }
}
