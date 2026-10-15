import pathlib, zipfile, hashlib, json
root=pathlib.Path(__file__).resolve().parent.parent
version=json.loads((root/'package.json').read_text())['version']
folder=root/'release-files'
files=sorted([*folder.glob('*.dmg'),*folder.glob('*.exe')])
if len(files)!=3: raise RuntimeError('Se esperan tres instaladores: Mac Apple Silicon, Mac Intel y Windows.')
readme=f'''CX Workspace {version}

Elige el instalador de tu computadora:
- Mac M1, M2, M3, M4 o posterior: mac-arm64.dmg
- Mac Intel: mac-intel.dmg
- Windows de 64 bits: windows-x64.exe

Descomprime este ZIP antes de instalar. En Mac abre el DMG y copia CX Workspace a Aplicaciones. En Windows abre el EXE y sigue el asistente.
macOS requiere 13.5 o posterior. La aplicación aún no está notarizada por Apple.

Inicia sesión con tu cuenta de Google o correo. Las cuentas nuevas quedan pendientes de que el administrador asigne rol y permisos.
Los expedientes se comparten mediante Supabase. La app busca futuras actualizaciones desde GitHub.

Descargas oficiales: https://github.com/ggarcia-create/cx-workspace/releases
'''
with zipfile.ZipFile(folder/f'CX-Workspace-{version}-instaladores.zip','w',compression=zipfile.ZIP_STORED) as archive:
 for file in files: archive.write(file,file.name)
 archive.writestr('LEEME.txt',readme)
 archive.writestr('SHA256.txt','\n'.join(hashlib.sha256(f.read_bytes()).hexdigest()+'  '+f.name for f in files)+'\n')
