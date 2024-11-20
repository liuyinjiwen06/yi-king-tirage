<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html>
      <head>
        <title>XML Sitemap</title>
        <style>
          body { font-family: sans-serif; }
          table { border-collapse: collapse; width: 100%; }
          th, td { padding: 10px; text-align: left; border: 1px solid #ddd; }
          th { background: #f5f5f5; }
        </style>
      </head>
      <body>
        <h1>XML Sitemap</h1>
        <table>
          <tr>
            <th>URL</th>
            <th>Last Modified</th>
            <th>Change Frequency</th>
            <th>Priority</th>
          </tr>
          <xsl:for-each select="sitemap:urlset/sitemap:url">
            <tr>
              <td><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a></td>
              <td><xsl:value-of select="sitemap:lastmod"/></td>
              <td><xsl:value-of select="sitemap:changefreq"/></td>
              <td><xsl:value-of select="sitemap:priority"/></td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>