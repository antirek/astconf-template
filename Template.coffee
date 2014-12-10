sugar = require 'sugar'
fs = require 'fs'
string = require 'string'
templates = {}


class Template

  constructor: (schema, section, @obj)->
    @schema = schema
    @section = section
    @attributes = {}
    @create()


  getSection: (key)->
    if @schema.sections[key]
      @schema.sections[key]


  create: ->
    fields = @getSection(@section).fields
    for key of fields
      if fields[key].required
        @attributes[key] = fields[key].default || ''

    if @obj
      for key in (Object.keys fields).intersect(Object.keys @obj)
        @attributes[key] = @obj[key]


  getAttributeFromSection: (section, key)->
    @getSection(section).fields[key]


  set: (key, value)->
    attribute = @getAttributeFromSection(@section, key)

    if attribute
      if attribute.available
        if value in attribute.available
          @attributes[key] = value
        else
          throw new Error 'Not available value'
      else
        if attribute.multiple
          current = @attributes[key]
          @attributes[key] = []
          if(current)
            @attributes[key].push current
          @attributes[key].push value
        else
          @attributes[key] = value
    else
      throw new Error 'This key not in schema'


  get: (key)->
    @attributes[key]


  getAttributes: ->
    @attributes


  getName: ->
    @get('name')


    
fs
.readdirSync "#{__dirname}/templates"
.forEach (file)->
  name = string file
  .chompRight '.json'
  .s
  schema = require "./templates/#{file}"
  templates[name] = (section, obj)->
    new Template schema, section, obj


module.exports = templates