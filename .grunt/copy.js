module.exports = {
    copy_files: {
          files: [
            // all the lib files
            {expand: true, flatten: true, src: ['src/index.html'], dest: 'build/'},
            {expand: true, flatten: true, src: ['src/js/libs/*'], dest: 'build/js/libs/'},
            
      
            // App & Main & Index
            {expand: true, flatten: true, src: ['src/js/app.js'], dest: 'build/js/'},
            {expand: true, flatten: true, src: ['src/js/main.js'], dest: 'build/js/'},
            // Images
             {expand: true, cwd: 'src', src: ['images/**'], dest: 'build/'},

            // //Templates
             {expand: true, cwd: 'src', src: ['js/views/templates/*'], dest: 'build/'},
          ],
    }
    
}