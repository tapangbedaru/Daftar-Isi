/* Author : Tushar Sharma
 *  Add Table of Content in blogger (7 type provided)
 *  Url: http://eutectics.blogspot.com/2014/12/add-table-of-content-or-sitemap-in-blogger-blog.html
 */
var postTitle = [],
    postUrl = [],
    postDate = [],
    postSum = [],
    postLabels = [],
    sortBy = "datenewest",
    tocLoaded = !1,
    numChars = 250,
    postFilter = "",
    tocdiv = document.getElementById("bp_toc"),
    totalEntires = 0,
    totalPosts = 0;

function loadtoc(c) {
    if ("entry" in c.feed) {
        var d = c.feed.entry.length;
        totalEntires += d;
        totalPosts = c.feed.openSearch$totalResults.$t;
        if (totalPosts > totalEntires) {
            var b = document.createElement("script");
            b.type = "text/javascript";
            startindex = totalEntires + 1;
            b.setAttribute("src", "/feeds/posts/summary?start-index=" + startindex + "&max-results=500&alt=json-in-script&callback=loadtoc");
            tocdiv.appendChild(b)
        }
        for (b = 0; b < d; b++) {
            for (var a = c.feed.entry[b], e = a.title.$t, k = a.published.$t.substring(0, 10), l, f = 0; f < a.link.length; f++)
                if ("alternate" ==
                    a.link[f].rel) {
                    l = a.link[f].href;
                    break
                }
            var g = "content" in a ? a.content.$t : "summary" in a ? a.summary.$t : "",
                g = g.replace(/<\S[^>]*>/g, "");
            if (g.length > numChars) var g = g.substring(0, numChars),
                h = g.lastIndexOf(" "),
                g = g.substring(0, h) + "...";
            h = "";
            if ("category" in a) {
                for (f = 0; f < a.category.length; f++) h += "<a href=\"javascript:filterPosts('" + a.category[f].term + "');\" title=\"Click here to select all posts with label '" + a.category[f].term + "'\">" + a.category[f].term + "</a>,  ";
                a = h.lastIndexOf(","); - 1 != a && (h = h.substring(0,
                    a))
            }
            postTitle.push(e);
            postDate.push(k);
            postUrl.push(l);
            postSum.push(g);
            postLabels.push(h)
        }
    }
    totalEntires == totalPosts && (tocLoaded = !0, showToc());
    sortPosts(sortBy);
    tocLoaded = !0
}

function filterPosts(c) {
    postFilter = c;
    displayToc(postFilter)
}

function allPosts() {
    postFilter = "";
    displayToc(postFilter)
}

function sortPosts(c) {
    function d(a, b) {
        var c = postTitle[a];
        postTitle[a] = postTitle[b];
        postTitle[b] = c;
        c = postDate[a];
        postDate[a] = postDate[b];
        postDate[b] = c;
        c = postUrl[a];
        postUrl[a] = postUrl[b];
        postUrl[b] = c;
        c = postSum[a];
        postSum[a] = postSum[b];
        postSum[b] = c;
        c = postLabels[a];
        postLabels[a] = postLabels[b];
        postLabels[b] = c
    }
    for (var b = 0; b < postTitle.length - 1; b++)
        for (var a = b + 1; a < postTitle.length; a++) "titleasc" == c && postTitle[b] > postTitle[a] && d(b, a), "titledesc" == c && postTitle[b] < postTitle[a] && d(b, a), "dateoldest" == c && postDate[b] >
            postDate[a] && d(b, a), "datenewest" == c && postDate[b] < postDate[a] && d(b, a)
}

function displayToc(c) {
    var d = 0,
        b, a = "Click to sort by title",
        e = "Click to sort by date",
        k = "";
    "titleasc" == sortBy && (a += " (descending)", e += " (newest first)");
    "titledesc" == sortBy && (a += " (ascending)", e += " (newest first)");
    "dateoldest" == sortBy && (a += " (ascending)", e += " (newest first)");
    "datenewest" == sortBy && (a += " (ascending)", e += " (oldest first)");
    "" != postFilter && (k = "Click to show all posts");
    b = "<table><tr>";
    b += '<td class="toc-header-col1">';
    b += '<a href="javascript:toggleTitleSort();" title="' + a + '">POST TITLE</a>';
    b += "</td>";
    b += '<td class="toc-header-col2">';
    b += '<a href="javascript:toggleDateSort();" title="' + e + '">DATE</a>';
    b += "</td>";
    b += '<td class="toc-header-col3">';
    b += '<a href="javascript:allPosts();" title="' + k + '"</a>';
    b += "</td>";
    b += "</tr>";
    for (a = 0; a < postTitle.length; a++) "" == c ? (b += '<tr><td class="toc-entry-col1"><a href="' + postUrl[a] + '" title="' + postSum[a] + '">' + postTitle[a] + '</a></td><td class="toc-entry-col2">' + postDate[a] + '</td><td class="toc-entry-col3">' + postLabels[a] + "</td></tr>", d++) :
        (z = postLabels[a].lastIndexOf(c), -1 != z && (b += '<tr><td class="toc-entry-col1"><a href="' + postUrl[a] + '" title="' + postSum[a] + '">' + postTitle[a] + '</a></td><td class="toc-entry-col2">' + postDate[a] + '</td><td class="toc-entry-col3">' + postLabels[a] + "</td></tr>", d++));
    b += "</table>";
    c = d == postTitle.length ? '<span class="toc-note">Displaying all ' + postTitle.length + " posts<br/></span>" : '<span class="toc-note">Displaying ' + d + " posts labeled '" + (postFilter + "' of " + postTitle.length + " posts total<br/></span>");
    tocdiv.innerHTML =
        c + b
}

function toggleTitleSort() {
    sortBy = "titleasc" == sortBy ? "titledesc" : "titleasc";
    sortPosts(sortBy);
    displayToc(postFilter)
}

function toggleDateSort() {
    sortBy = "datenewest" == sortBy ? "dateoldest" : "datenewest";
    sortPosts(sortBy);
    displayToc(postFilter)
}

function showToc() {
    tocLoaded ? (displayToc(postFilter), document.getElementById("toclink")) : alert("Just wait... TOC is loading")
}

function hideToc() {
    document.getElementById("toc").innerHTML = "";
    document.getElementById("toclink").innerHTML = '<a href="#" onclick="scroll(0,0); showToc(); Effect.toggle(\'toc-result\',\'blind\');">\u00bb Show Table of Contents</a> <img src="http://chenkaie.blog.googlepages.com/new_1.gif"/>'
};
