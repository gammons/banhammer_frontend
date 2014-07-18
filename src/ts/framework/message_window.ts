/// <reference path="../defs/jquery.d.ts"/>
module Crimbo {
  export class MessageWindow {
    notify = (message: string) => {
      $('.messages ul').append("<li>"+message+"</li>");
      $('.messages').scrollTop($('.messages')[0].scrollHeight);
    }
  }
}

