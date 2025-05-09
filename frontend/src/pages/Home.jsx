import { useEffect, useState } from "react";
import api from "../services/api.js";
import "../styles/Home.css"; // Ajuste o caminho conforme a estrutura do seu projeto

function App() {
  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    descricao: "",
    valor: "",
    quantidade: "",
  });
  const [editandoProduto, setEditandoProduto] = useState(null);

  const carregarProdutos = async () => {
    try {
      const res = await api.get("/listar_produtos");
      setProdutos(res.data);
    } catch (err) {
      console.error("Erro ao carregar produtos", err);
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const criarProduto = async () => {
    try {
      await api.post("/adicionar_produtos", {
        ...novoProduto,
        valor: parseFloat(novoProduto.valor),
        quantidade: parseInt(novoProduto.quantidade),
      });
      setNovoProduto({ nome: "", descricao: "", valor: "", quantidade: "" });
      carregarProdutos();
    } catch (err) {
      console.error("Erro ao criar produto", err);
    }
  };

  const atualizarProduto = async () => {
    try {
      await api.patch(`/editar_produto/${editandoProduto.id}`, {
        ...editandoProduto,
        valor: parseFloat(editandoProduto.valor),
        quantidade: parseInt(editandoProduto.quantidade),
      });
      setEditandoProduto(null);
      carregarProdutos();
    } catch (err) {
      console.error("Erro ao atualizar produto", err);
    }
  };

  const deletarProduto = async (id) => {
    try {
      await api.delete(`/deletar_produto/${id}`);
      carregarProdutos();
    } catch (err) {
      console.error("Erro ao deletar produto", err);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Gerenciamento de Produtos</h1>

      {/* Lista de produtos */}
      <ul>
        {produtos.map((p) => (
          <table key={p.id} style={{ width: "100%", marginBottom: "1rem" }}>
            <thead>
              <tr>
                <th style={{ width: "10%" }}>Código</th>
                <th style={{ width: "20%" }}>Produto</th>
                <th style={{ width: "10%" }}>Valor</th>
                <th style={{ width: "10%" }}>Quantidade</th>
                <th style={{ width: "50%" }}>Descrição</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>{p.id}</strong>
                </td>
                <td>
                  <strong>{p.nome}</strong>
                </td>
                <td>
                  <strong>
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(p.valor)}
                  </strong>
                </td>
                <td>
                  <strong>{p.quantidade}</strong>
                </td>
                <td>
                  <strong>{p.descricao}</strong>
                </td>
                <td>
                  <button
                    onClick={() => setEditandoProduto(p)}
                    style={{ marginLeft: 10 }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deletarProduto(p.id)}
                    style={{ marginLeft: 5 }}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
      </ul>

      <hr />

      {/* Formulário de criação */}
      <h2>Adicionar Produto</h2>
      <input
        placeholder="Nome"
        value={novoProduto.nome}
        onChange={(e) =>
          setNovoProduto({ ...novoProduto, nome: e.target.value })
        }
      />
      <input
        placeholder="Descrição"
        value={novoProduto.descricao}
        onChange={(e) =>
          setNovoProduto({ ...novoProduto, descricao: e.target.value })
        }
      />
      <input
        placeholder="Valor"
        type="number"
        step="0.01"
        value={novoProduto.valor}
        onChange={(e) =>
          setNovoProduto({ ...novoProduto, valor: e.target.value })
        }
      />
      <input
        placeholder="Quantidade"
        type="number"
        value={novoProduto.quantidade}
        onChange={(e) =>
          setNovoProduto({ ...novoProduto, quantidade: e.target.value })
        }
      />
      <button onClick={criarProduto}>Criar</button>

      {/* Modal de edição */}
      {editandoProduto && (
        <div
          style={{
            marginTop: "2rem",
            border: "1px solid #ccc",
            padding: "1rem",
          }}
        >
          <h2>Editar Produto</h2>
          <input
            value={editandoProduto.nome}
            onChange={(e) =>
              setEditandoProduto({ ...editandoProduto, nome: e.target.value })
            }
          />
          <input
            value={editandoProduto.descricao}
            onChange={(e) =>
              setEditandoProduto({
                ...editandoProduto,
                descricao: e.target.value,
              })
            }
          />
          <input
            type="number"
            step="0.01"
            value={editandoProduto.valor}
            onChange={(e) =>
              setEditandoProduto({ ...editandoProduto, valor: e.target.value })
            }
          />
          <input
            type="number"
            value={editandoProduto.quantidade}
            onChange={(e) =>
              setEditandoProduto({
                ...editandoProduto,
                quantidade: e.target.value,
              })
            }
          />
          <button onClick={atualizarProduto}>Salvar</button>
          <button onClick={() => setEditandoProduto(null)}>Cancelar</button>
        </div>
      )}
    </div>
  );
}

export default App;
