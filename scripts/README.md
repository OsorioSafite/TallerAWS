# Scripts: permisos de ejecucion

## Linux / macOS (bash)

```bash
chmod +x linux-deploy.sh mac-deploy.sh
```

Ejecutar:

```bash
./linux-deploy.sh -t <TEMPLATE_FILE> -c <CONFIG_FILE> -p <AWS_PROFILE>
./mac-deploy.sh -t <TEMPLATE_FILE> -c <CONFIG_FILE> -p <AWS_PROFILE>
```

## Windows (PowerShell)

Permitir la ejecucion en la sesion actual:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

Ejecutar:

```powershell
.\windows-deploy.ps1 -TemplateFile <TEMPLATE_FILE> -ConfigFile <CONFIG_FILE> -AwsProfile <AWS_PROFILE>
```
