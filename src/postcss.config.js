/**
 * Created by robin on 17/5/5.
 */

module.exports = ({ file, options, env }) => {
    return {
    parser: file.extname === '.sss' ? 'sugarss' : false,
    plugins: {
        'postcss-import': { root: file.dirname },
        'postcss-cssnext': options.cssnext,
        'autoprefixer':  options.autoprefixer ,
        'cssnano': options.cssnano
    }
}};