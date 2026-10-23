# Diagnóstico da conta Kommo (somente leitura)

Baixa tudo o que existe na conta (funis, etapas, leads, contatos, empresas, campos, tags, tarefas, usuários, motivos de perda)
e gera `RELATORIO.md` apontando o que precisa de organização. **Só faz leitura (GET); nada é alterado.**

## Como rodar (no seu computador, Python 3.8+, sem instalar nada)

1. No Kommo: Configurações › Integrações › Criar integração: preencha só Nome e Descrição e salve.
   Na aba **Chaves e escopos**, gere o **token de longa duração** e copie (ele aparece uma vez só).
2. No terminal:
   ```
   export KOMMO_SUBDOMAIN=suaempresa      # o que vem antes de .kommo.com
   export KOMMO_TOKEN='cole-o-token'
   python3 kommo_snapshot.py
   ```
   No Windows (PowerShell): `$env:KOMMO_SUBDOMAIN="suaempresa"; $env:KOMMO_TOKEN="..."; python kommo_snapshot.py`
3. Abra a pasta `kommo_snapshot_<data>/`. O `RELATORIO.md` é o diagnóstico; os `.json` são os dados brutos.

**Atenção:** a pasta gerada contém dados pessoais de clientes. Ela já está no `.gitignore`; não faça commit dela.
O token dá acesso de administrador: não cole em código nem compartilhe.
