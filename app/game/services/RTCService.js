angular.module("game").provider("RTC", function( /* no DI here, in providers!*/ ) {
"use strict";
	
	function createRTC($rootScope, Config) {

		var _channelName, _connected = false;

		var channel = new DataChannel();
		channel.direction = "one-to-one";
		channel.firebase = Config.rtc.firebase;
		channel.autoCloseEntireSession = true;

		channel.onopen = function(userId) {
			_connected = true;
			$rootScope.$broadcast("rtc_onopen", userId);
		}

		channel.onmessage = function(message, userId) {
			$rootScope.$broadcast("rtc_onmessage", message);
		}
		
		channel.onleave = function(userId) {
			_connected = false;
			_channelName = undefined;
			$rootScope.$broadcast("rtc_onleave", userId);
		}

		return {

			connected : function() {
				return _connected;
			},
			
			open : function(channelName) {
				if (!channelName)
					channelName = Math.random().toString().substr(2,10);

				channel.open(channelName);
				_channelName = channelName;
				return channelName;
			},

			connect : function(channelName) {
				if (!channelName) {
					return false;
				}	
				_channelName = channelName;
				return channel.connect(channelName);
			},

			send : function(text) {
				channel.send(text);
			},

			leave : function() {
				if (channel && _connected) {
					channel.leave();
				}
				_connected = false;
				_channelName = undefined;
			}
		
		};

	};
	



	var RTC;

	this.$get = function($rootScope, Config) {
		return RTC || (RTC = createRTC($rootScope, Config));
	};

});