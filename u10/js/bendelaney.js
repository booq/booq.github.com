window.addEvent('domready', function() {
			var Posts = $('.Post');
			var PhotoSetEmbeds = $('.html_photoset embed');

			Posts.each(function(post, index, array) {
				if (post.getElement('.Words') != null) {
					var body = post.getElement('.PostBody');
					var NumberOfWords = body.get('text').split(' ').length;
					post.getElement('.WordCount').set('html', NumberOfWords);
				}

				if (post.getElement('embed.photoset')) {
					var PhotoSetEmbed = post.getElement('embed.photoset');
					PhotoSetEmbed.setProperties({
						 width: '770'
						,height: '771'
					});
				}

				if (post.getElement('.Video') &amp;&amp; !post.hasClass('do_not_resize')) {
					var el = post.getElement('object') || post.getElement('iframe') || post.getElement('embed');
					if (el) {
						var w = el.getProperty('width');
						var h = el.getProperty('height');
						var p = ((770 - w) * 100)/w;
						var newW = 770;
						var newH = (h * ('1.'+p).toFloat()).round(); 
						el.setProperties({width:newW, height:newH});
						if (el.getElement('embed')) {
							el.getElement('embed').setProperties({width:newW, height:newH});
						}
					}
				}
			});

			{block:PermalinkPage}
			var uri = window.location.search.substring(1);
			if (uri.contains('print')) {
				$('.Post .PrintPostLink', '.Post .Notes', '.Post .PermaPageNotes', '.Post .Words', '.Post .Tags').each(function(el) {
					el.setStyle('display', 'none');
				});
				(function() { window.print(); }).delay(400)
			}
			{/block:PermalinkPage}
		});