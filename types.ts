export interface Usuario{
    id:string
    nombre: string
    apellidos: string
    email: string
    creado: string
}

export interface Producto{
    id: string
    nombre:string
    existencia: number
    precio:number
    creado: string
}

export interface ClienteType{
    id: string
    nombre:string
    apellido:string
    empresa:string
    email:string
    telefono:string
    vendedor: string
}

interface itemPedido{
    id: string
    cantidad: number
}

export interface Pedido{
    id: string
    pedido: Array<itemPedido>
    total: number
    cliente:string
    vendedor: string
    fecha: string
    estado: "PENDIENTE" | "COMPLETADO" | "CANCELADO"
    
}
