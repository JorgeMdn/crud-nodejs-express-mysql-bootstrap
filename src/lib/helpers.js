const bcrypt = require('bcryptjs');
const helpers = {};

helpers.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10); // Generamos un hash, o un patron
    const hash = await bcrypt.hash(password, salt); // ciframos la contraseña
    return hash; // Devolvemos la contraseña
};

helpers.matchPassword = async(password, savedPassword) => {
    try {
        await bcrypt.compare(password, savedPassword);
    } catch (error) {
        console.log(error);
    }
}

module.exports = helpers