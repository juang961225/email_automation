/**
 * this program will build the base of the banners automatically
 *  regardless of their size or number of images.
 */

// instances
const fs = require("fs");
const path = require("path");

//constants
const folderLocation = "../banners__aCrear";
const outPutFolder = "../build";

/**
 *  search for a folder path
 * @param {string} filePath
 * @returns items within that folder
 */
const getFileList = (filePath) => {
    const files = fs.readdirSync(filePath);
    return files.filter((file) => file !== ".DS_Store");
};

/**
 *  is responsible for deleting everything in the folder
 * @param {string} filePath
 */
const hardDelete = (filePath) => {
    fs.rmSync(filePath, { recursive: true });
};

/**
 * validates if a folder exists and deletes everything
 *  in it to make the environment ready for new banners
 */
const prepareEnvironment = () => {
    if (fs.existsSync(outPutFolder)) {
        hardDelete(outPutFolder);
    }
    fs.mkdirSync(outPutFolder);
};

/**
 * this function prepares the folder and performs
 *  the banner creation process for each of the folders
 *  that you have.
 * @param {Array} list
 */
const createBaseFolders = (list) => {
    prepareEnvironment();
    list.forEach((element) => {
        const folderPath = path.join(__dirname, outPutFolder, element);
        fs.mkdirSync(folderPath);
    });
};

/**
 * receives and clears the folder titles that already
 * have an established format
 * @param {*} element
 * @returns clean elements
 */
const getbannerData = (element) => {
    return {
        width: element.split("__").pop().split("x").shift(),
        height: element.split("x").pop(),
        name: element.split("__").shift(),
    };
};

/**
 * creates the elements html
 * @param {string} clasName
 * @returns template string
 */
const elementMarkup = (clasName, type = "html") => {
    const x = clasName.split(".").shift();

    if (type == "html") {
        return `<div class="${x}"><img src="./assets/${clasName}" alt=""></div>`;
    }
};

/**
 * executes all the logic to create the html structure with its style and base script
 * @param {string} list
 */
const createHtmlFiles = (list) => {
    // leer plantilla
    const baseHtml = fs.readFileSync("./template/index.html", "utf8");

    // crear html porcada folderLocation
    list.forEach((element) => {
        const { width, height, name } = getbannerData(element);

        const assetFolder = `${folderLocation}/${element}/assets`;
        const newAssetPath = `../build/${element}`;
        const bannerAssets = fs.existsSync(assetFolder)
            ? getFileList(assetFolder)
            : [];

        // Verificar si el archivo existe y moverlo
        if (fs.existsSync(assetFolder)) {
            const nuevaRutaCarpetaAssets = path.join(newAssetPath, "assets");
            fs.mkdirSync(nuevaRutaCarpetaAssets); // Crear la carpeta 'assets' en el directorio de salida

            const archivosAssets = getFileList(assetFolder);
            archivosAssets.forEach((archivo) => {
                const rutaArchivoOrigen = path.join(assetFolder, archivo);
                const rutaArchivoDestino = path.join(
                    nuevaRutaCarpetaAssets,
                    archivo
                );
                fs.copyFileSync(rutaArchivoOrigen, rutaArchivoDestino);
                console.log(`Archivo ${archivo} copiado con éxito`);
            });
        } else {
            console.log("La carpeta de activos no existe");
        }

        const bannerMarkup = bannerAssets
            .map((element) => elementMarkup(element))
            .join("\n");

        // replace tags in html for content
        const html = baseHtml
            .replace("__WIDTH__", width)
            .replace("__NOMBRE__", name)
            .replace("__HEIGHT__", height)
            .replace("__BANNER__", bannerMarkup)

        fs.writeFileSync(
            `${outPutFolder}/${element}/${name}.html`,
            html,
            "utf8"
        );
    });
};

const buildBanners = () => {
    const bannerFolders = getFileList(folderLocation);

    createBaseFolders(bannerFolders);
    createHtmlFiles(bannerFolders);
};

buildBanners();

//organizar css con posiciones
