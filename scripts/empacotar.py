"""Cria o pacote de entrega usando somente arquivos versionados e íntegros."""

import hashlib
import json
from pathlib import Path
import subprocess
from zipfile import ZIP_DEFLATED, ZipFile

raiz = Path(__file__).resolve().parent.parent


def git(*argumentos):
    return subprocess.check_output(["git", *argumentos], cwd=raiz)


if git("status", "--porcelain", "--untracked-files=no").strip():
    raise SystemExit("Finalize o commit antes de gerar o pacote de entrega.")

pacote = json.loads((raiz / "package.json").read_text(encoding="utf-8"))
commit = git("rev-parse", "HEAD").decode().strip()
versao = pacote["version"]
destino = raiz / "dist"
if destino.is_symlink():
    raise SystemExit("O diretório de saída não pode ser um link simbólico.")
destino.mkdir(exist_ok=True)
arquivo_zip = destino / f"sports-central-uc15-v{versao}.zip"
arquivos = git("ls-files", "-z").decode("utf-8").split("\0")
manifesto = {"versao": versao, "commit": commit, "arquivos": {}}

with ZipFile(arquivo_zip, "w", compression=ZIP_DEFLATED) as saida:
    for nome in sorted(filter(None, arquivos)):
        caminho = (raiz / nome).resolve()
        if not caminho.is_relative_to(raiz) or (raiz / nome).is_symlink():
            raise SystemExit(f"Arquivo fora do projeto ou link não permitido: {nome}")
        if any(parte in {".git", ".cache", ".estudo", "node_modules", "dist", "test-results", "playwright-report"} for parte in Path(nome).parts):
            raise SystemExit(f"Arquivo indevido no versionamento: {nome}")
        # Lê o blob do Git para evitar diferenças de CRLF e garantir a versão do commit.
        conteudo = git("show", f"HEAD:{nome}")
        manifesto["arquivos"][nome] = hashlib.sha256(conteudo).hexdigest()
        saida.writestr(f"projeto-recuperacao-uc15/{nome}", conteudo)
    saida.writestr("projeto-recuperacao-uc15/CONFERENCIA-ENTREGA.json", json.dumps(manifesto, ensure_ascii=False, indent=2) + "\n")

with ZipFile(arquivo_zip) as entrada:
    if entrada.testzip() is not None:
        raise SystemExit("O pacote gerado não passou na conferência de integridade.")
    for nome, esperado in manifesto["arquivos"].items():
        obtido = hashlib.sha256(entrada.read(f"projeto-recuperacao-uc15/{nome}")).hexdigest()
        if obtido != esperado:
            raise SystemExit(f"Hash divergente: {nome}")

resumo = hashlib.sha256(arquivo_zip.read_bytes()).hexdigest()
(destino / f"{arquivo_zip.name}.sha256").write_text(f"{resumo}  {arquivo_zip.name}\n", encoding="utf-8")
print(f"Pacote conferido: {arquivo_zip.name}; {len(manifesto['arquivos'])} arquivos versionados; commit {commit}.")
