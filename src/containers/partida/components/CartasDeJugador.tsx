import { useState, useEffect } from "react";
import { imageCartaFigura, type CartaFigura } from "./img_cartas_figura";
import { ObtenerCartasFiguras } from "@/services/api/obtener_carta_figura";
import Cartas from "./Cartas";

const CartasDeJugador = ({
    id_partida,
    id_jugador,
    nombre_jugador,
}: {
    id_partida: number;
    id_jugador: number;
    nombre_jugador: string;
}) => {
    const [cartasFiguras, setCartasFiguras] = useState<CartaFigura[]>([]);

    useEffect(() => {
        fetchCartasMovimiento();
    }, []);

    const fetchCartasMovimiento = async () => {
        try {
            const data = await ObtenerCartasFiguras(id_partida, id_jugador);
            const cartas = data.map((carta) =>
                imageCartaFigura(carta.figura, carta.revelada)
            );
            setCartasFiguras(cartas);
        } catch (error) {
            console.error("Error fetching cartas movimiento:", error);
        }
    };

    return (
        <div
            className={`flex w-fit flex-row justify-center gap-1 rounded-md border-2 border-black bg-yellow-100 px-2 pt-2`}
        >
            <div className="flex justify-center gap-2">
                {cartasFiguras.map((carta, indexCarta) => (
                    <div
                        key={`${id_jugador}-${indexCarta}-carta-figura`}
                        className="w-[68px] max-lg:w-[70px]"
                    >
                        <Cartas
                            imgSrc={carta.img}
                            rotation={0}
                            middle={false}
                            altText={`Carta del jugador ${id_jugador + 1} - Carta ${indexCarta + 1}`}
                            isSelect={false}
                        />
                    </div>
                ))}
            </div>
            <div className="flex h-24 w-36 items-center justify-center rounded-md border-2 border-black bg-white px-1">
                <p
                    className={`break-words text-center font-semibold ${nombre_jugador.length > 30 ? "!break-all text-sm" : "text-xl"}`}
                >
                    {nombre_jugador}
                </p>
            </div>
        </div>
    );
};

export default CartasDeJugador;
