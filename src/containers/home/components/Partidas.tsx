import { useEffect, useState } from "react";
import FormUnirse from "./FormUnirse";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ObtenerPartidas, type Partida } from "@/services/api/obtener_partidas";
import { useWebSocketListaPartidas } from "@/services/websockets/websockets_lista_partidas";
import FiltroCantJugadores from "./FiltroCantJugadores";
import { Input } from "@/components/ui/input";

function Partidas() {
    const [partidas, setPartidas] = useState<Partida[]>([]);
    const [filtrosActivosCantJugadores, setFiltrosActivosCantJugadores] =
        useState<number[]>([]);
    const { triggerActualizaPartidas } = useWebSocketListaPartidas();
    const [filtroPorNombre, setFiltroPorNombre] = useState("");
    const [partidasFiltradas, setPartidasFiltradas] = useState<Partida[]>([]);

    useEffect(() => {
        fetchPartidas();
    }, [triggerActualizaPartidas]);

    useEffect(() => {
        filtrarPartidas();
    }, [filtrosActivosCantJugadores, filtroPorNombre, partidas]);

    const fetchPartidas = async () => {
        try {
            const data = await ObtenerPartidas();
            setPartidas(data);
        } catch (err) {
            console.error("No se pudieron obtener las partidas.");
        }
    };

    const filtrarPartidas = () => {
        let partidasFiltradasAux = partidas;

        // Filtrar por cantidad de jugadores
        if (filtrosActivosCantJugadores.length > 0) {
            partidasFiltradasAux = partidasFiltradasAux.filter((partida) =>
                filtrosActivosCantJugadores.includes(
                    partida.numero_de_jugadores
                )
            );
        }

        // Filtrar por nombre de partida
        if (filtroPorNombre !== "") {
            partidasFiltradasAux = partidasFiltradasAux.filter((partida) =>
                partida.nombre_partida
                    .toLowerCase()
                    .includes(filtroPorNombre.toLowerCase())
            );
        }

        setPartidasFiltradas(partidasFiltradasAux);
    };

    const manejarFiltroCantJugadores = (cantidad: number) => {
        setFiltrosActivosCantJugadores((prevFiltros) => {
            if (prevFiltros.includes(cantidad)) {
                return prevFiltros.filter((filtro) => filtro !== cantidad);
            } else {
                return prevFiltros.concat(cantidad);
            }
        });
    };

    return (
        <div
            className="flex flex-col items-center justify-center pt-10"
            id="listapartidas"
        >
            <p className="mb-2 text-center text-2xl font-black uppercase">
                Lista de partidas
            </p>

            <div className="mb-2 flex w-full flex-col justify-between rounded-md border-2 border-black bg-green-400 px-4 py-2 shadow-sm lg:flex-row lg:items-center">
                <FiltroCantJugadores
                    filtros={filtrosActivosCantJugadores}
                    manejarFiltro={manejarFiltroCantJugadores}
                />

                <div className="max-lg:w-full">
                    <Input
                        className="w-full border-2 border-black"
                        placeholder="Filtrar por nombre"
                        value={filtroPorNombre}
                        onChange={(e) => setFiltroPorNombre(e.target.value)}
                    />
                </div>
            </div>

            <ScrollArea className="h-96 w-full overflow-auto rounded-md border-2 border-black bg-green-400">
                <div className="flex flex-col space-y-4 p-4">
                    <ul>
                        {partidasFiltradas.map((partida) => (
                            <li key={partida.id}>
                                <FormUnirse
                                    partidaId={partida.id}
                                    partidaName={partida.nombre_partida}
                                    partidaJugadores={
                                        partida.numero_de_jugadores
                                    }
                                />
                            </li>
                        ))}
                        {partidasFiltradas.length === 0 && (
                            <div className="flex h-80 items-center justify-center">
                                <p className="text-center opacity-65">
                                    No hay partidas creadas.
                                </p>
                            </div>
                        )}
                    </ul>
                </div>
            </ScrollArea>
        </div>
    );
}

export default Partidas;
