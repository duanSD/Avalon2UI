/**
 * Created by Administrator on 2016/6/6 0006.
 */
var avalon=require("avalon");
require("../../css/lib/bootstrap/less/bootstrap.less");
require("../../css/lib/bootstrap/less/theme.less");
var uptop=require("../components/carousel/avalon2.carousel");
avalon.define({
        $id:'demo',
        description :"图片锟斤拷锟斤拷锟斤拷锟捷ｏ拷",
        opt:{
            pictures: [{
                src: 'http://7xkm02.com1.z0.glb.clouddn.com/s11.jpeg',
                href: 'http://7xkm02.com1.z0.glb.clouddn.com/s11.jpeg',
                title: "title1",
                description: '<h3>图片锟斤拷锟斤拷一</h3>{{description}}<i>图片1</i>'
            }, {
                src: 'http://7xkm02.com1.z0.glb.clouddn.com/s12.jpeg',
                href: 'http://7xkm02.com1.z0.glb.clouddn.com/s12.jpeg',
                title: "title2",
                description: '<h3>图片锟斤拷锟斤拷锟斤拷</h3>{{description}}<i>图片2</i>'
            }, {
                src: 'http://7xkm02.com1.z0.glb.clouddn.com/s13.jpeg',
                href: 'http://7xkm02.com1.z0.glb.clouddn.com/s13.jpeg',
                title: "title3",
                description: '<h3>图片锟斤拷锟斤拷锟斤拷</h3>{{description}}<i>图片3</i>'
            }, {
                src: 'http://7xkm02.com1.z0.glb.clouddn.com/s14.jpeg',
                href: 'http://7xkm02.com1.z0.glb.clouddn.com/s14.jpeg',
                title: "title4",
                description: '<h3>图片锟斤拷锟斤拷锟斤拷</h3>{{description}}<i>图片4</i>'
            }, {
                src: 'http://7xkm02.com1.z0.glb.clouddn.com/s15.jpeg',
                href: 'http://7xkm02.com1.z0.glb.clouddn.com/s15.jpeg',
                title: "title5",
                description: '<h3>图片锟斤拷锟斤拷锟斤拷</h3>{{description}}<i>图片5</i>'
            }],
            showDescription: true
        }
    })
