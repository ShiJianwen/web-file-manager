//文件列表
var Files = [{
    'name': '/',
    'folder': '',
    'index_id': 0
}, {
    'name': 'home',
    'folder': '/',
    'index_id': 1
}, {
    'name': 'txt',
    'folder': '/',
    'index_id': 2
}, {
    'name': 'txt1',
    'folder': '/home',
    'index_id': 3
}];

//索引列表
var Indexs = [{
    'type': 'folder',
    'block_id': 0
}, {
    'type': 'folder',
    'block_id': 2
}, {
    'type': 'file',
    'block_id': 1
}, {
    'type': 'file',
    'block_id': 1
}];

//存储块区域
var Blocks = [{
    'content': ['home', 'txt'],
    'used': true
}, {
    'content': 'hello world',
    'used': true
}, {
    'content': ['txt1'],
    'used': true
}, {
    'content': '',
    'used': false
}, {
    'content': '',
    'used': false
}, {
    'content': '',
    'used': false
}, {
    'content': '',
    'used': false
}, {
    'content': '',
    'used': false
}, {
    'content': '',
    'used': false
}, {
    'content': '',
    'used': false
}, {
    'content': '',
    'used': false
}, {
    'content': '',
    'used': false
}, {
    'content': '',
    'used': false
}, {
    'content': '',
    'used': false
}, {
    'content': '',
    'used': false
}];