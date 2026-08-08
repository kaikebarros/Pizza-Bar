import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FiPlus, FiSearch, FiShoppingBag } from "react-icons/fi";
import { LuCakeSlice, LuCupSoda, LuPackage, LuPizza } from "react-icons/lu";
import pizzaCardUm from "../assets/pizza-card-1.png";
import { db } from "../Layout/Services/Firebase";
import "./Inicio.css";
import Pedidos from "./Pedidos";

function Inicio() {
  interface Produto {
    id: string;
    nome: string;
    preco: number;
    categoria: string;
    imagem: string;
    descricao: string;
    resumo: string;
  }
  interface ItemSacola {
    produto: Produto;
    quantidade: number;
    observacao: string;
  }
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [descricaoAberta, setDescricaoAberta] = useState<string | null>(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("todos");
  const [textoInput, setTextoInput] = useState("");
  const [sacola, setSacola] = useState<ItemSacola[]>([]);
  const [sacolaAberta, setSacolaAberta] = useState(false);

  async function buscarProdutos(): Promise<void> {
    const produtosRef = collection(db, "produtos");

    const resposta = await getDocs(produtosRef);

    const lista: Produto[] = resposta.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Produto, "id">),
    }));

    setProdutos(lista);
  }

  useEffect(() => {
    buscarProdutos();
  }, []);

  const addASacola = (produto: Produto) => {
    const novaSacola = [...sacola];

    const resultado = novaSacola.find((item) => item.produto.id === produto.id);

    if (resultado) {
      resultado.quantidade += 1;
    } else {
      novaSacola.push({
        produto: produto,
        quantidade: 1,
        observacao: "",
      });
    }

    setSacola(novaSacola);
  };
  const diminuirQtd = (produto: Produto) => {
    const novaSacola = [...sacola];

    const resultado = novaSacola.find((item) => item.produto.id === produto.id);

    if (resultado) {
      resultado.quantidade -= 1;
    }
    if (resultado?.quantidade === 0) {
      novaSacola.splice(novaSacola.indexOf(resultado), 1);
    }
    setSacola(novaSacola);
  };
  const removerPedido = (produto: Produto) => {
    const novaSacola = [...sacola];

    const resultado = novaSacola.find((item) => item.produto.id === produto.id);

    if (resultado) {
      novaSacola.splice(novaSacola.indexOf(resultado), 1);
    }
    setSacola(novaSacola);
  };
  const limparSacola = () => {
    setSacola([]);
  };

  const fecharSacola = () => {
    setSacolaAberta(false);
  };

  const itemNaSacola = (produto: Produto) => {
    return sacola.find((item) => {
      return item.produto.id === produto.id;
    });
  };

  const calcularPreco = (produto: ItemSacola) => {
    const subtotal = produto.produto.preco * produto.quantidade;
    return subtotal;
  };

  const alterarObservacao = (produtoId: string, observacao: string) => {
    const novaSacola = sacola.map((item) => {
      if (item.produto.id === produtoId)
        return {
          ...item,
          observacao: observacao,
        };

      return item;
    });

    setSacola(novaSacola);
  };
 

  return (
    <>
      {sacolaAberta && (
        <Pedidos
          fecharSacola={fecharSacola}
          sacola={sacola}
          diminuirQtd={diminuirQtd}
          addASacola={addASacola}
          removerPedido={removerPedido}
          limparSacola={limparSacola}
          calcularPreco={calcularPreco}
          alterarObservacao={alterarObservacao}
        />
      )}

      <div className="inicio">
        <div className="input">
          <label htmlFor="buscar" className="buscar"></label>

          <input
            type="search"
            id="buscar"
            placeholder="O que você vai pedir hoje?"
            onChange={(evento) => {
              setTextoInput(evento.target.value);
            }}
          />

          <FiSearch />
        </div>
        <div className="card">
          <img src={pizzaCardUm} alt="" />

          <div className="conteudo-card">
            <h2>QUENTE E PRONTO</h2>

            <h1>PIZZA</h1>

            <p>Large Pepperoni</p>
            <button className="btn-cta">Peça agora →</button>
          </div>
        </div>
        <section>
          <div className="categorias">
            <div
              className="tradicionais"
              onClick={() => {
                {
                  setCategoriaSelecionada(
                    categoriaSelecionada === "tradicionais"
                      ? "todos"
                      : "tradicionais",
                  );
                }
              }}
            >
              <LuPizza />
              <span>Tradicionais</span>
            </div>
            <div
              className="combos"
              onClick={() => {
                {
                  setCategoriaSelecionada(
                    categoriaSelecionada === "combos" ? "todos" : "combos",
                  );
                }
              }}
            >
              <LuPackage />
              Combos
            </div>
            <div
              className="bebidas"
              onClick={() => {
                {
                  setCategoriaSelecionada(
                    categoriaSelecionada === "bebidas" ? "todos" : "bebidas",
                  );
                }
              }}
            >
              <LuCupSoda />
              <span>Bebidas</span>
            </div>
            <div
              className="sobremesa"
              onClick={() => {
                {
                  setCategoriaSelecionada(
                    categoriaSelecionada === "sobremesa"
                      ? "todos"
                      : "sobremesa",
                  );
                }
              }}
            >
              <LuCakeSlice />
              <span>Sobremesa</span>
            </div>
          </div>
        </section>

        <h2 className="subtitulo">Pra você</h2>

        <section>
          <div className="produtos">
            {}

            {produtos
              .filter((produto) =>
                categoriaSelecionada === "todos"
                  ? true
                  : produto.categoria === categoriaSelecionada,
              )

              .filter((produto) =>
                produto.nome
                  .toLocaleLowerCase()
                  .includes(textoInput.toLocaleLowerCase()),
              )

              .map((produto) => (
                <div className="card-produto" key={produto.id}>
                  <img src={pizzaCardUm} alt="" />

                  <div className="conteudo-produto">
                    <h2>{produto.nome}</h2>

                    <p
                      className={`resumo ${descricaoAberta === produto.id ? " aberta" : ""}`}
                      onClick={() =>
                        setDescricaoAberta(
                          descricaoAberta === produto.id ? null : produto.id,
                        )
                      }
                    >
                      {produto.descricao}
                    </p>
                    <p className="preco">
                      {produto.preco.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  </div>

                  <button
                    className="btn-add"
                    onClick={() => {
                      addASacola(produto);
                    }}
                  >
                    {" "}
                    <FiPlus />
                    <span className="btn-add-span">
                      {itemNaSacola(produto)?.quantidade}
                    </span>
                  </button>
                </div>
              ))}
          </div>
          <div className="btn-sacola">
            <button
              onClick={() => {
                setSacolaAberta(true);
              }}
            >
              <FiShoppingBag />
            </button>

            <span>{sacola.length >= 1 ? sacola.length : ""}</span>
          </div>
        </section>
      </div>
    </>
  );
}

export default Inicio;
