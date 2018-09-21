module.exports = {
    copy_files: {
          files: [
            {expand: true, flatten: true, src: ['src/index.html'], dest: 'build/'},
            {expand: true, flatten: true, src: ['src/js/libs/*'], dest: 'build/js/libs/'},         
            {expand: true, flatten: true, src: ['src/js/app.js'], dest: 'build/js/'},
            {expand: true, flatten: true, src: ['src/js/main.js'], dest: 'build/js/'},
            {expand: true, cwd: 'src', src: ['images/**'], dest: 'build/'},
            {expand: true, cwd: 'src', src: ['js/views/templates/*'], dest: 'build/'},
          ],
    }  
}

//copying all necessary folders and files to build folder