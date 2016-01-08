window.onload = function() {

    //当前路径
    var DIR = [];

    /**
     * 获取当前路径
     * @return {String} dir 当前路径
     */
    var genDir = function() {
        var dir;
        dir = DIR.join('/');
        dir = dir.replace(/\/\//, "/");
        return dir;
    };

    /**
     * 根据文件名和所在文件夹获取文件信息
     * @param  {String} filename   文件名
     * @param  {String} foldername 文件所在路径
     * @return 	{Object}           文件详细信息
     */
    var getFileInfo = function(filename, foldername) {
        var file_obj = {};
        for (var file of Files) {
            if (file.name === filename && file.folder === foldername) {
                file_obj.name = file.name;
                file_obj.index_id = file.index_id;
                file_obj.block_id = Indexs[file.index_id].block_id;
                file_obj.type = Indexs[file.index_id].type;
                file_obj.content = Blocks[Indexs[file.index_id].block_id].content;
            }

        }
        return file_obj;
    };


    /**
     * 初始化文件夹
     * @param  {String} folder     文件夹名
     * @param  {String} folder_dir 文件夹所处路径
     */
    var initFolder = function(folder, folder_dir) {
        DIR.push(folder);
        var dir = genDir();
        $('.web-files-dir').text(dir);
        //先清空当前文件夹
        $('.web-files-content').html('');

        for (var file of Files) {
            if (file.name === folder && file.folder === folder_dir) {
                var block_id = Indexs[file.index_id].block_id;
                var file_content = Blocks[block_id].content;
                for (subfile of file_content) {
                    var fileinfo = getFileInfo(subfile, dir);
                    var icon_text = fileinfo.type == 'file' ? 'insert_drive_file' : 'folder';
                    var elem = "<div class='file-unit " + fileinfo.type + "' data-dir='" + dir + "'> <i class='material-icons web-files-icon'>" + icon_text + "</i>" +
                        "<br>" +
                        "<span id='filename'>" + fileinfo.name + "</span>" +
                        "</div>";
                    $('.web-files-content').append(elem);
                }
            }
        }
    };

    /**
     * 修改文件内容
     * @param  {String} filename [文件名]
     * @param  {String} file_dir [文件所在路径]
     * @param  {String} newtext  [要修改成的文本]
     */
    var rewriteFile = function(filename, file_dir, newtext) {
        for(file of Files) {
            if(file.name === filename && file.folder === file_dir) {
                Blocks[Indexs[file.index_id].block_id].content = newtext;
            }
        }
    };

    var deleteFile = function(filename, file_dir) {
        for(file of Files) {
            if(file.name === filename && file.folder === file_dir) {
                
            }
        }
    };

    //双击文件查看文件内容
    $(document).on('dblclick', '.file', function(e) {
        e.preventDefault();
        var dir = genDir();
        var filename = e.currentTarget.querySelector('#filename').innerText;
        var fileinfo = getFileInfo(filename, dir);
        $('.modal-header h4').text(fileinfo.name);
        $('.modal-body input').val(fileinfo.content);
        $('#file-detail').modal('show');
    });

    //双击文件夹初始化文件夹内容
    $(document).on('dblclick', '.folder', function(e) {
        e.preventDefault();
        var foldername = e.currentTarget.querySelector('#filename').innerText;
        var folderdir = $(e.currentTarget).data('dir');
        initFolder(foldername, folderdir);
    });

    //点击修改文本
    $(document).on('click', '#confirm-rewrite', function(e) {
        var filename = $('.modal-header h4').text();
        var file_dir = genDir();
        var newtext = $('#rewrite-text').val();
        rewriteFile(filename, file_dir, newtext);
        $('#file-detail').modal('hide');
    });

    /**
     * 判断该文件在该文件夹下能否插入（判断是否重名和磁盘大小是否够用）
     * @param  {String} filename 文件名
     * @param  {String} dir      当前文件夹
     * @param {String}  file_type 文件类型
     * @return {Object} newindex        新文件的索引节点
     */
    var canInsert = function(filename, dir, file_type) {

        var newindex = {};
        //判断重名
        for (var file of Files) {
            if (file.name === filename && file.folder === dir && Indexs[file.index_id].type === file_type) {
                alert('文件已存在');
                return false;
            }
        }
        //判断磁盘空间是否够用
        for (var block of Blocks) {
            if (block.used === true) {
                if (Blocks.indexOf(block) === Blocks.length - 1) {
                    alert('磁盘没有可用空间');
                    return false;
                } else {
                    continue;
                }
            } else {
                //生成新的索引节点
                newindex.block_id = Blocks.indexOf(block);
                block.used = true;
                if (file_type === 'folder') {
                    block.content = [];
                }
                return newindex;
            }
        }

    };

    //新建文件和文件夹
    $(document).on('click', '#add-file,#add-folder', function(e) {
        if ($('.file-name-input').val()) {
            var dir = genDir();
            var filename = $('.file-name-input').val();
            var newfile_type = e.currentTarget.id == 'add-folder' ? 'folder' : 'file';
            var file_type = newfile_type == 'file' ? 'insert_drive_file' : 'folder';
            var newindex = canInsert(filename, dir, newfile_type);
            if (newindex) {
                newindex.type = newfile_type;
                var newfile = {
                    name: filename,
                    folder: dir,
                    index_id: Indexs.length
                };
                Files.push(newfile);
                Indexs.push(newindex);
                var newfile_folder = DIR[DIR.length - 1];
                var newfile_folder_dir = DIR.slice(0, DIR.length - 1).join('/');
                newfile_folder_dir = newfile_folder_dir.replace(/\/\//, "/");
                var folder_block = getFileInfo(newfile_folder, newfile_folder_dir);
                folder_block.content.push(filename);
                var elem = "<div class='file-unit " + newfile_type + "' data-dir='" + dir + "'> <i class='material-icons web-files-icon'>" + file_type + "</i>" +
                    "<br>" +
                    "<span id='filename'>" + newfile.name + "</span>" +
                    "</div>";
                $('.web-files-content').append(elem);
                $('.file-name-input').val('');
            } else {
                return false;
            }
        } else {
            alert('请输入要添加的文件或文件夹名');
        }
    });

    $(document).on('click', '#back-to-root', function() {
        DIR.length = 0;
        initFolder('/', '');
    });



    initFolder('/', '');
};