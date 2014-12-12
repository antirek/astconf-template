sugar = require 'sugar'
fs = require 'fs'
string = require 'string'
templates = {}


class Template

  constructor: (@schema, @section, @obj)->
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

    if @validate()
      for key in (Object.keys fields).intersect(Object.keys @obj)
        @attributes[key] = @obj[key]


  validate: -> 
    for key of @obj

      switch typeof @obj[key]
        when 'object'
          if Array.isArray @obj[key]
            for k in @obj[key]
              if typeof @obj[key][k] isnt ('string' or 'number')
                throw new Error 'attribute array can\'t contain other objects or arrays'
          else
            throw new Error 'object must be array'
        when 'number', 'string', 'boolean'
          break
        else 
          throw new Error 'obj can contain attributes with number, string, boolean or plain array'
    true


  getAttributeFromSection: (section, key)->
    @getSection(section).fields[key]


  set: ->
    args = Array.prototype.slice.call arguments, 0

    if typeof args[0] is 'object' 
      for key of args[0]
        switch typeof args[0][key]
          when 'object'
            if Array.isArray args[0][key]
              for k in args[0][key]
                switch typeof k
                  when 'string', 'number', 'boolean'
                    @setOne key, k
                  else
                    throw new Error 'values of array must be string, number or boolean'
            else
              throw new Error 'value must be array'

          when 'string', 'number', 'boolean'
            @setOne key, args[0][key]
            
          else
            console.log typeof args[0][key], args[0][key], key
            throw new Error 'not available set object'
    else if args[1]
      if Array.isArray args[1]
        for k in args[1]
          switch typeof k
            when 'string', 'number', 'boolean'
              @setOne args[0], k
            else
              throw new Error 'values of array must be string, number or boolean'
      else
        @setOne args[0], args[1]
    else
      throw new Error 'check set params'

  setOne: (key, value)->
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
          if current
            if !Array.isArray current
              @attributes[key] = []
              @attributes[key].push current
            @attributes[key].push value
          else
            @attributes[key] = value
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