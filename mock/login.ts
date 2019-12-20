export default {
  'POST /v1/login': (
    req: { body: { password: any; user_name: any; type: any } },
    res: {
      send: (data: any) => void;
    },
  ) => {
    const { password, user_name, type } = req.body;
    console.log(password, user_name);
    console.log(password === 'e10adc3949ba59abbe56e057f20f883e');
    if (password === 'e10adc3949ba59abbe56e057f20f883e' && user_name === 'admin') {
      res.send({
        data: {
          code: 1,
          user_name: 'admin',
          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
          authority: { '/system': true, '/account': true },
        },
      });
      return;
    }
    if (password === 'e10adc3949ba59abbe56e057f20f883e' && user_name === 'user') {
      res.send({
        data: {
          code: 1,
          user_name: 'user',
          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
          authority: { '/account': true },
          // isFirst: true,
        },
      });
      return;
    }
    res.send({
      code: 5,
      message: '账号或密码错误',
    });
  },
};
