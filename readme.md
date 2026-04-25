
# 🛠️ Guía de Instalación requisitos previos: AWS CLI , AWS SAM y DOCKER

¡Bienvenido al Taller de AWS! En este repositorio encontraras todo el material necesario para el desarrollo del taller, pero antes de comennzar, es importante asegurarnos de que tienes instalados los requisitos previos necesarios para seguir el taller sin problemas.

Para instalar los requisitos previos, puedes seguir los pasos detallados a continuación.

---

Sigue los pasos correspondientes a tu sistema operativo.

## 1️⃣ Instalación de AWS CLI

AWS CLI te permite administrar tus servicios de AWS directamente desde la terminal.

Podras encontrar todo lo necesario para la instalación en la documentacón de aws: [Documentacion AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

### 🪟 Windows
1. Descarga el instalador MSI oficial desde este enlace:
   [Instalador AWS CLI Windows](https://awscli.amazonaws.com/AWSCLIV2.msi)
2. Una vez descargado, abre el archivo `.msi` y sigue las instrucciones del asistente de instalación.
3. Una vez finalizado, es importante tener en cuenta que el instalador de AWS CLI no añade automáticamente la ruta de instalación a tu variable de entorno `PATH`. Para solucionar esto, sigue estos pasos:
   - Abre el **Panel de Control** y navega a **Sistema** > **Configuración avanzada del sistema** > **Variables de entorno**.
   - En la sección "Variables del sistema", busca la variable llamada `Path` y haz clic en "Editar".
   - Agrega la ruta relativa del binario de AWS CLI (ruta de ejemplo):
     ```
     C:\Program Files\Amazon\AWSCLIV2\
     ```
   - Guarda los cambios y cierra todas las ventanas.
   - Es problable que necesites reiniciar tu computadora para que los cambios surtan efecto.
4. Para verificar que AWS CLI se ha instalado correctamente, abre una nueva terminal (símbolo del sistema o PowerShell) y ejecuta:
   ```bash
   aws --version
   ```

### 🍎 macOS
Puedes usar el instalador de la terminal. Abre tu aplicación **Terminal** y ejecuta estos comandos:
1. Descarga el paquete de instalación:
   ```bash
   curl "[https://awscli.amazonaws.com/AWSCLIV2.pkg](https://awscli.amazonaws.com/AWSCLIV2.pkg)" -o "AWSCLIV2.pkg"
   ```
2. Ejecuta el instalador (te pedirá la contraseña de tu Mac):
   ```bash
   sudo installer -pkg AWSCLIV2.pkg -target /
   ```
3. Para verificar que AWS CLI se ha instalado correctamente, ejecuta este comando en tu terminal:
   ```bash
    aws --version
    ```

### 🐧 Linux (x86_64)
Abre tu terminal y ejecuta los siguientes comandos uno por uno:
1. Descarga el archivo de instalación, para esto tienes 2 opciones:
    - Opcion 1: Descargarlo desde el navegador con este enlace: [AWS CLI](https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip)
    - Opcion 2: Descargarlo directamente desde la terminal usando `curl`:
    ```bash
    curl "[https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip](https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip)" -o "awscliv2.zip"
    ```
2. Opcionalmente puedes verificar la integridad del archivo descargado comparando su hash SHA256 con el valor proporcionado en la página oficial de AWS CLI. Para esto, ejecuta el siguiente comando en tu terminal:
   ```bash
   sha256sum awscliv2.zip
   ```
   Luego, compara el resultado con el hash SHA256 que se encuentra en la página de descargas de AWS CLI para asegurarte de que el archivo no ha sido corrompido durante la descarga.

3. Descomprime el archivo (asegúrate de tener `unzip` instalado):
   ```bash
   unzip awscliv2.zip
   ```
4. Ejecuta el script de instalación:
   ```bash
   sudo ./aws/install
   ```
5. Para verificar que AWS CLI se ha instalado correctamente, ejecuta este comando en tu terminal:
   ```bash
   aws --version
   ```
---

## 2️⃣ Instalación de AWS SAM CLI

AWS SAM CLI es una herramienta que facilita la creación, prueba y despliegue de aplicaciones Serverless (sin servidor).

Todas las instrucciones para la instalación de AWS SAM CLI se encuentran en la documentación oficial de AWS: [Documentacion AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)

### 🪟 Windows
1. Descarga el instalador MSI oficial desde este enlace:
   [Descargar instalador de AWS SAM para Windows](https://github.com/aws/aws-sam-cli/releases/latest/download/AWS_SAM_CLI_64_PY3.msi)
2. Abre el archivo `.msi` descargado y sigue los pasos del asistente de instalación.
3. Para verificar que AWS SAM CLI se ha instalado correctamente, abre una nueva terminal (símbolo del sistema o PowerShell) y ejecuta:
   ```bash
   sam --version
   ```

### 🍎 macOS
La forma más recomendada de instalar SAM en Mac es utilizando **Homebrew** (un gestor de paquetes). Abre tu terminal y ejecuta:
1. Añade el repositorio de AWS a Homebrew:
   ```bash
   brew tap aws/tap
   ```
2. Instala AWS SAM CLI:
   ```bash
   brew install aws-sam-cli
   ```

### 🐧 Linux (x86_64)
Abre tu terminal y ejecuta la siguiente secuencia de comandos:
1. Descarga el archivo comprimido oficial, ya sea directasmente desde el navegador con este enlace: [AWS SAM CLI](https://github.com/aws/aws-sam-cli/releases/latest/download/aws-sam-cli-linux-x86_64.zip)
2. Extrae los archivos en un directorio temporal:
   ```bash
   unzip aws-sam-cli-linux-x86_64.zip -d sam-installation
   ```
3. Instala SAM CLI:
   ```bash
   sudo ./sam-installation/install
   ```
4. Para verificar que AWS SAM CLI se ha instalado correctamente, ejecuta este comando en tu terminal:
   ```bash
   sam --version
   ```
---

¡Listo! Ahora tienes AWS CLI y AWS SAM CLI instalados en tu computadora. 


## 3️⃣ Instalación de Docker

Docker es una plataforma que nos permite empaquetar y ejecutar aplicaciones en contenedores, a continuación, encontrarás las instrucciones para instalar Docker en tu sistema operativo extraidas del sitio oficial de Docker: [Documentacion Docker Engine](https://docs.docker.com/engine/install/)

### 🐧 Linux (Docker Engine)
# Install Docker Engine


This section describes how to install Docker Engine on Linux, also known as
Docker CE. Docker Engine is also available for Windows, macOS, and Linux,
through Docker Desktop. For instructions on how to install Docker Desktop,
see: [Overview of Docker Desktop](/desktop/).

## Installation procedures for supported platforms

Click on a platform's link to view the relevant installation procedure.

| Platform                                       | x86_64 / amd64 | arm64 / aarch64 | arm (32-bit) | ppc64le | s390x |
| :--------------------------------------------- | :------------: | :-------------: | :----------: | :-----: | :---: |
| [CentOS](/engine/install/centos/)                            |       ✅       |       ✅        |              |   ✅    |       |
| [Debian](/engine/install/debian/)                            |       ✅       |       ✅        |      ✅      |   ✅    |       |
| [Fedora](/engine/install/fedora/)                            |       ✅       |       ✅        |              |   ✅    |       |
| [Raspberry Pi OS (32-bit)](/engine/install/raspberry-pi-os/) |                |                 |      ⚠️      |         |       |
| [RHEL](/engine/install/rhel/)                                |       ✅       |       ✅        |              |         |  ✅   |
| [SLES](/engine/install/sles/)                                |                |                 |              |         |  ❌   |
| [Ubuntu](/engine/install/ubuntu/)                            |       ✅       |       ✅        |      ✅      |   ✅    |  ✅   |
| [Binaries](/engine/install/binaries/)                        |       ✅       |       ✅        |      ✅      |         |       |

### Other Linux distributions

> [!NOTE]
>
> While the following instructions may work, Docker doesn't test or verify
> installation on distribution derivatives.

- If you use Debian derivatives such as "BunsenLabs Linux", "Kali Linux" or
  "LMDE" (Debian-based Mint) should follow the installation instructions for
  [Debian](/engine/install/debian/), substitute the version of your distribution for the
  corresponding Debian release. Refer to the documentation of your distribution to find
  which Debian release corresponds with your derivative version.
- Likewise, if you use Ubuntu derivatives such as "Kubuntu", "Lubuntu" or "Xubuntu"
  you should follow the installation instructions for [Ubuntu](/engine/install/ubuntu/),
  substituting the version of your distribution for the corresponding Ubuntu release.
  Refer to the documentation of your distribution to find which Ubuntu release
  corresponds with your derivative version.
- Some Linux distributions provide a package of Docker Engine through their
  package repositories. These packages are built and maintained by the Linux
  distribution's package maintainers and may have differences in configuration
  or are built from modified source code. Docker isn't involved in releasing these
  packages and you should report any bugs or issues involving these packages to
  your Linux distribution's issue tracker.

Docker provides [binaries](/engine/install/binaries/) for manual installation of Docker Engine.
These binaries are statically linked and you can use them on any Linux distribution.

## Release channels

Docker Engine has two types of update channels, **stable** and **test**:

* The **stable** channel gives you the latest versions released for general availability.
* The **test** channel gives you pre-release versions that are ready for testing before
  general availability.

Use the test channel with caution. Pre-release versions include experimental and
early-access features that are subject to breaking changes.

## Support

Docker Engine is an open source project, supported by the Moby project maintainers
and community members. Docker doesn't provide support for Docker Engine.
Docker provides support for Docker products, including Docker Desktop, which uses
Docker Engine as one of its components.

For information about the open source project, refer to the
[Moby project website](https://mobyproject.org/).

### Upgrade path

Patch releases are always backward compatible with its major and minor version.

### Licensing

Commercial use of Docker Engine obtained via Docker Desktop
within larger enterprises (exceeding 250 employees OR with annual revenue surpassing
$10 million USD), requires a [paid subscription](https://www.docker.com/pricing?ref=Docs&refAction=DocsEngineInstall).
Apache License, Version 2.0. See [LICENSE](https://github.com/moby/moby/blob/master/LICENSE) for the full license.

## Reporting security issues

If you discover a security issue, we request that you bring it to our attention immediately.

DO NOT file a public issue. Instead, submit your report privately to security@docker.com.

Security reports are greatly appreciated, and Docker will publicly thank you for it.

## Get started

After setting up Docker, you can learn the basics with
[Getting started with Docker](/get-started/introduction/).



-----

## ✅ Verificación de Docker

Para asegurarnos de que Docker está corriendo correctamente, abre tu terminal correspondiente y ejecuta:

```bash
docker --version
```

*(Deberías ver un texto indicando la versión instalada, por ejemplo: `Docker version 24.0.X, build...`)*
