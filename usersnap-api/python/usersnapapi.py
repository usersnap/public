#
# Usersnap Api Client v0.1
#
# an Python client to access the Usersnap API
# (https://usersnap.com/support/docs/usersnapapi)
#
#
# Notes:
# You need an Usersnap account to use this API client.
# Register for a free trial at http://usersnap.com
#
# History:
# 2013-02-27 Created the first implementation
#
# Copyright 2011-2013 by Usersnap
#
# contact@usersnap.com
# http://usersnap.com
#
# --------------------------------------------------------------------
import httplib2
import json
import re
import optparse
from urllib import urlencode
import sys

class UsersnapClient():
    def __init__(self, token, applicationName):
        self.token = token
        self.applicationName = applicationName
        self.apiUrl = "https://restapi.usersnap.com/v1/"
        self.client = httplib2.Http(disable_ssl_certificate_validation=True)
    def setToken(self, token):
        self.token = token
        
    def setApplicationName(self, appName):
        self.applicationName = appName
        
    def __makeBaseUrl(self, service):
        url = "%s%s?token=%s" % (self.apiUrl, service, self.token)
        return url.encode("utf-8") 

    def __makeGetRequest(self, service):
        resp, content = None,None
        try:
            resp, content = self.client.request(self.__makeBaseUrl(service), "GET", 
                                  headers={'content-type':'application/json; charset=utf-8',
                                           'User-Agent': self.applicationName,
                                           'Accept':'application/json'}
                                  )
            jsonresp = json.loads(content)
            return jsonresp
        except:
            raise BaseException("GET Error fetching %r: %r %r" % (service, resp, content))
        
    def __makePostRequest(self, service, data):
        resp, content = None,None
        try:
            resp, content = self.client.request(self.__makeBaseUrl(service), "POST", 
                          urlencode(data), 
                          headers={'User-Agent': self.applicationName,
                                   'Content-type': 'application/x-www-form-urlencoded',
                                   'Accept':'application/json'})
            jsonresp = json.loads(content)
            return jsonresp
        except:
            raise BaseException("POST Error fetching %r: %r %r" % (service, resp, content))
        
    def getUserInfo(self):
        jsondata = self.__makeGetRequest("getUserInfo")
        return jsondata
    
    def getServiceState(self):
        jsondata = self.__makeGetRequest("getServiceState")
        return jsondata
    
    def listApiKeys(self):
        jsondata = self.__makeGetRequest("listApiKeys")
        return jsondata
        
    def getApiKey(self, key):
        if key is None:
            raise BaseException("No key specified")
        else:
            jsondata = self.__makePostRequest("getApiKey", {"apikey": key})
            return jsondata
            
    def createApiKey(self, title, urlList, type, apiCfg):
        regex = re.compile(
            r'^(?:http|ftp)s?://' # http:// or https://
            r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|' #domain...
            r'localhost|' #localhost...
            r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})' # ...or ip
            r'(?::\d+)?' # optional port
            r'(?:/?|[/?]\S+)$', re.IGNORECASE)
        
        for url in urlList:
            if regex.match(url) is None:
                raise BaseException("The specified url '%s' is wrong!" % (url))
            
        jsondata = self.__makePostRequest("createApiKey", {
                                                        "title": title,
                                                        "urls": json.dumps(urlList),
                                                        "api_type": type,
                                                        "api_config": json.dumps(apiCfg) 
                                                        })
        return jsondata
        
    def changeApiKey(self, key, title=None, urlList=None, type=None, apiCfg=None):
        regex = re.compile(
            r'^(?:http|ftp)s?://' # http:// or https://
            r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|' #domain...
            r'localhost|' #localhost...
            r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})' # ...or ip
            r'(?::\d+)?' # optional port
            r'(?:/?|[/?]\S+)$', re.IGNORECASE)
        
        data = {
           "apikey": key, 
        }
        if title is not None:
            data["title"] = title
            
        if urlList is not None:
            for url in urlList:
                if regex.match(url) is None:
                    raise BaseException("The specified url '%s' is wrong!" % (url))
            data["urls"] = json.dumps(urlList)
            
        if apiCfg is not None:
            data["api_config"] = json.dumps(apiCfg)
            
        if type is not None:
            data["api_type"] = type
        
        jsondata = self.__makePostRequest("changeApiKey", data)
        return jsondata
        
    def addUrl(self, key, url):
        regex = re.compile(
            r'^(?:http|ftp)s?://' # http:// or https://
            r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|' #domain...
            r'localhost|' #localhost...
            r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})' # ...or ip
            r'(?::\d+)?' # optional port
            r'(?:/?|[/?]\S+)$', re.IGNORECASE)
            
        if regex.match(url) is None:
            raise BaseException("The specified url '%s' is wrong!" % (url))
        
        jsondata = self.__makePostRequest("addUrl", {
                                                     "apikey": key,
                                                     "url": url
        })
        return jsondata
        
    def removeUrl(self, key, url):
        regex = re.compile(
            r'^(?:http|ftp)s?://' # http:// or https://
            r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|' #domain...
            r'localhost|' #localhost...
            r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})' # ...or ip
            r'(?::\d+)?' # optional port
            r'(?:/?|[/?]\S+)$', re.IGNORECASE)
            
        if regex.match(url) is None:
            raise BaseException("The specified url '%s' is wrong!" % (url))
        
        jsondata = self.__makePostRequest("removeUrl", {
                                                     "apikey": key,
                                                     "url": url
        })
        return jsondata
        
    def removeApiKey(self, key):        
        jsondata = self.__makePostRequest("removeApiKey", {
                                                     "apikey": key,
        })
        return jsondata
    
    def testDelivery(self, key):        
        jsondata = self.__makePostRequest("testDelivery", {
                                                     "apikey": key,
        })
        return jsondata
        
    def getReportStatistics(self, key):        
        jsondata = self.__makePostRequest("getReportStatistics", {
                                                     "apikey": key,
        })
        return jsondata
        
    def getSnippet(self, key):        
        jsondata = self.__makePostRequest("getSnippet", {
                                                     "apikey": key,
        })
        return jsondata
        

if __name__ == "__main__": # pragma: no cover
    parser = optparse.OptionParser(usage="usage: %prog Servicename Token [options]")
    parser.add_option('-k', '--key', metavar='APIKEY', dest='apikey', help="the apikey")
    parser.add_option('-s', '--siteurl', metavar='SITEURL', dest='siteurl', help="the siteurl", default=None)
    parser.add_option('-i', '--title', metavar='TITLE', dest='title', help="the title", default=None)
    parser.add_option('-t', '--apitype', metavar='APITYPE', dest='apitype', help="the apitype eg. email", default=None)
    parser.add_option('-c', '--apicfg', metavar='APICFG', dest='apicfg', help="the apicfg", default=None)
    parser.add_option('-u', '--user-agent', metavar='USERAGENT', dest='useragent', help="the useragent string")

    (options, args) = parser.parse_args()
    if len(args) == 0:
        print "Please specify a service action!"
        sys.exit(-1) 
    if len(args)==1:
        token = None
    else:
        token = args[1]
    if options.useragent is not None:
        usClient = UsersnapClient(token, options.useragent)
    else:
        usClient = UsersnapClient(token, "Usersnap Python Client V0.1")
    if args[0].lower() == "getuserinfo":
        resp = usClient.getUserInfo()
        print(json.dumps(resp, indent=4))
    elif args[0].lower() == "getservicestate":
        resp = usClient.getServiceState()
        print(json.dumps(resp, indent=4))
    elif args[0].lower() == "listapikeys":
        resp = usClient.listApiKeys()
        print(json.dumps(resp, indent=4))
    elif args[0].lower() == "getapikey":
        resp = usClient.getApiKey(options.apikey)
        print(json.dumps(resp, indent=4))
    elif args[0].lower() == "createapikey":
        resp = usClient.createApiKey(options.title, [options.siteurl], options.apitype, json.loads(options.apicfg))
        print(json.dumps(resp, indent=4))
    elif args[0].lower() == "changeapikey":
        try:
            cfg = json.loads(options.apicfg)
        except:
            cfg = None
        urls = None
        if options.siteurl is not None:
            urls = [options.siteurl]
        resp = usClient.changeApiKey(options.apikey, options.title, urls, options.apitype, cfg)
        print(json.dumps(resp, indent=4))
    elif args[0].lower() == "addurl":
        resp = usClient.addUrl(options.apikey, options.siteurl)
        print(json.dumps(resp, indent=4))
    elif args[0].lower() == "removeurl":
        resp = usClient.removeUrl(options.apikey, options.siteurl)
        print(json.dumps(resp, indent=4))
    elif args[0].lower() == "removeapikey":
        resp = usClient.removeApiKey(options.apikey)
        print(json.dumps(resp, indent=4))
    elif args[0].lower() == "testdelivery":
        resp = usClient.testDelivery(options.apikey)
        print(json.dumps(resp, indent=4))
    elif args[0].lower() == "getreportstatistics":
        resp = usClient.getReportStatistics(options.apikey)
        print(json.dumps(resp, indent=4))
    elif args[0].lower() == "getsnippet":
        resp = usClient.getSnippet(options.apikey)
        print(json.dumps(resp, indent=4))
    else:
        print "Service '%s' not implemented!" % (args[0])