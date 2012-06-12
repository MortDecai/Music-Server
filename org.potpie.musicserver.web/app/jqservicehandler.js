define(['jquery'], function($) {
	
	var Deferred = function(url, postData) {
		this.url = url;
		this.postData = postData;
	};
	
	Deferred.prototype = {
		addCallbacks: function(success, error) {
			var isPost = (this.postData !== undefined) ? true : false;
	        $.ajax({
	        	url: this.url,
	        	type: isPost ? "POST" : "GET",
	        	data: isPost ? JSON.stringify(this.postData) : undefined,
	        	contentTypeString: "application/x-www-form-urlencoded; charset=utf-8",
	        	dataType: "text",
	        	success: function(data, textStatus, jqXHR) {
	        		if (data.length > 0) {
		    			var result;
		        		try {
		        			result = eval("(" + data + ")");
		        		} catch (e) {
		        			error({status: 500, statusText: "failed to eval : "+e});
		        			return;
		        		}
		        		success(result);
	        		} else {
	        			success();
	        		}
	        	},
	        	error: function(jqXHR, textStatus, errorThrown) {
	        		console.log("error:"+errorThrown);
	        		error({status: jqXHR.status, statusText: textStatus});
	        	}
	        });			
		}	
	};
	
	var _contextRoot = ".";
	ServiceHandler = {
		setContextRoot : function(contextRoot) {
			_contextRoot = contextRoot;
		},
		
		getContextRoot: function() {
			return _contextRoot;
		},
		
		getArtists: function() {
			var url = _contextRoot+ "/service/artist/";
			return this._invokeService(url, arguments);
		},
		
		getArtistsTabDetails: function() {
			var url = _contextRoot+ "/service/artist?tabs=true";
			return this._invokeService(url, arguments);
		},
		
		getArtistsByIndexRange: function(listId, startIndex, endIndex) {
			var url = _contextRoot+ "/service/artist?listId="+listId+"&startIndex="+startIndex+"&endIndex="+endIndex;
			return this._invokeService(url, arguments);
		},
		
		getSongsForAlbum: function(album, artist) {
			var url = _contextRoot+ "/service/album/"+encodeURIComponent(album);
			if (artist !== undefined) {
				url += "?artist="+encodeURIComponent(artist);
			}
			return this._invokeService(url, arguments);
		},

		getSongsForArtist: function(artist) {
			var url = _contextRoot+ "/service/artist/"+encodeURIComponent(artist);
			return this._invokeService(url, arguments);
		},
		
		getAlbumsForArtist: function(artist) {
			var url = _contextRoot+ "/service/albumsForArtist/"+encodeURIComponent(artist);
			return this._invokeService(url, arguments);
		},

		addToPlayList: function(songs) {
			var url = _contextRoot+ "/service/addToPlayList";
			return this._invokeService(url, arguments, songs);
		},

		addToStreamPlayList: function(songs) {
			var url = _contextRoot+ "/service/addToStreamPlayList";
			return this._invokeService(url, arguments, songs);
		},

		removeFromPlayList: function(songs) {
			var url = _contextRoot+ "/service/removeFromPlayList";
			return this._invokeService(url, arguments, songs);
		},

		removeFromStreamPlayList: function(songs) {
			var url = _contextRoot+ "/service/removeFromStreamPlayList";
			return this._invokeService(url, arguments, songs);
		},

		addAlbumToPlayList: function(album, artist) {
			var url = _contextRoot+ "/service/addAlbumToPlayList/"+encodeURIComponent(album);
			if (artist !== undefined) {
				url += "?artist="+encodeURIComponent(artist);
			}
			return this._invokeService(url, arguments);
		},

		addAlbumToStreamPlayList: function(album, artist) {
			var url = _contextRoot+ "/service/addAlbumToStreamPlayList/"+encodeURIComponent(album);
			if (artist !== undefined) {
				url += "?artist="+encodeURIComponent(artist);
			}
			return this._invokeService(url, arguments);
		},

		clearPlayList: function() {
			var url = _contextRoot+ "/service/clearPlayList";
			return this._invokeService(url, arguments);
		},

		clearStreamPlayList: function() {
			var url = _contextRoot+ "/service/clearStreamPlayList";
			return this._invokeService(url, arguments);
		},
		
		currentlyPlaying: function() {
			var url = _contextRoot+ "/service/currentlyPlaying";
			return this._invokeService(url, arguments);
		},
		
		currentlyStreaming: function() {
			var url = _contextRoot+ "/service/currentlyStreaming";
			return this._invokeService(url, arguments);
		},
		
		play: function() {
			var url = _contextRoot+ "/service/play";
			return this._invokeService(url, arguments);
		},
		
		streamPlay: function() {
			var url = _contextRoot+ "/service/streamPlay";
			return this._invokeService(url, arguments);
		},
		
		pause: function() {
			var url = _contextRoot+ "/service/pause";
			return this._invokeService(url, arguments);
		},
		
		stop: function() {
			var url = _contextRoot+ "/service/stop";
			return this._invokeService(url, arguments);
		},
		
		next: function() {
			var url = _contextRoot+ "/service/next";
			return this._invokeService(url, arguments);
		},
		
		streamNext: function() {
			var url = _contextRoot+ "/service/streamNext";
			return this._invokeService(url, arguments);
		},
		
		previous: function() {
			var url = _contextRoot+ "/service/previous";
			return this._invokeService(url, arguments);
		},
		
		streamPrevious: function() {
			var url = _contextRoot+ "/service/streamPrevious";
			return this._invokeService(url, arguments);
		},
		
		setVolume: function(volume) {
			var url = _contextRoot+ "/service/setVolume/"+volume;
			return this._invokeService(url, arguments);
		},
		
		randomPlaylist: function(artist) {
			var url = _contextRoot+ "/service/randomPlaylist";
			if (artist !== undefined) {
				url += "/"+encodeURIComponent(artist);
			}
			return this._invokeService(url, arguments);
		},
		
		randomStreamPlaylist: function(artist) {
			var url = _contextRoot+ "/service/randomStreamPlaylist";
			if (artist !== undefined) {
				url += "/"+encodeURIComponent(artist);
			}
			return this._invokeService(url, arguments);
		},
		
		getPlaylist: function() {
			var url = _contextRoot+ "/service/playList";
			return this._invokeService(url, arguments);
		},
		
		getStreamPlaylist: function() {
			var url = _contextRoot+ "/service/streamPlayList";
			return this._invokeService(url, arguments);
		},
		
		getAllAlbums: function() {
			var url = _contextRoot+ "/service/album";
			return this._invokeService(url, arguments);
		},
			
		initialize: function(rootDir, storageDir) {
			var url = _contextRoot+ "/service/initialize";
			return this._invokeService(url, arguments, {rootDir: rootDir, storageDir: storageDir});
		},
			
		_invokeService : function(url, args, postData) {
			return new Deferred(url, postData);
		}
	};
	return ServiceHandler;
});