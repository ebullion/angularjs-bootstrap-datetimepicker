/* globals describe, beforeEach, it, expect, module, inject, moment, angular, afterEach, jQuery, jasmine */

/**
 * @license angularjs-bootstrap-datetimepicker
 * Copyright 2016 Knight Rider Consulting, Inc. http://www.knightrider.com
 * License: MIT
 *
 * @author        Dale "Ducky" Lotts
 * @since        10/15/15
 */

describe('css styling', function () {
  'use strict'

  var element = null
  var $rootScope

  beforeEach(module('ui.bootstrap.datetimepicker'))
  beforeEach(inject(function ($compile, _$rootScope_) {
    moment.locale('en')
    $rootScope = _$rootScope_
    jasmine.clock().install()

    var baseDate = moment('2013-01-23T00:00:00.000').toDate()
    jasmine.clock().mockDate(baseDate)

    expect(moment().toDate().getTime()).toEqual(baseDate.getTime())

    $rootScope.date = moment('2013-01-22T00:00:00.000').toDate()
    element = $compile('<datetimepicker data-ng-model="date"></datetimepicker>')($rootScope)
    angular.element(document).find('body').append(element)
    $rootScope.$digest()
  }))

  it('of `.datetimepicker` should have a width of 320', function () {
    expect(element.width()).toBe(320)
    expect(jQuery(element).css('width')).toBe('320px')
  })

  describe('of `.active` element', function () {
    it('should have a height of 20', function () {
      var activeElement = jQuery('.active', element)
      expect(activeElement.height()).toBe(20)
    })
    it('should have blue background', function () {
      var activeElement = jQuery('.active', element)
      expect(activeElement.css('background-color')).toBe('rgb(0, 68, 204)')
    })
    it('should have white text', function () {
      var activeElement = jQuery('.active', element)
      expect(activeElement.css('color')).toBe('rgb(255, 255, 255)')
    })
  })

  describe('of `.past` element', function () {
    it('should have grey text', function () {
      var activeElement = jQuery('.past', element)
      expect(activeElement.css('color')).toBe('rgb(153, 153, 153)')
    })
  })

  describe('of `.future` element', function () {
    it('should have grey text', function () {
      var activeElement = jQuery('.future', element)
      expect(activeElement.css('color')).toBe('rgb(153, 153, 153)')
    })
  })

  describe('of `.current` element', function () {
    it('should have light grey background when not active', function () {
      var todayElement = element.find('.current')
      expect(todayElement.text()).toBe('23')
      expect(todayElement.css('background-color')).toBe('rgb(229, 229, 229)')
    })
    it('should have `.active` background when active', function () {
      $rootScope.date = moment('2013-01-23T00:00:00.000').toDate()
      $rootScope.$digest()
      var todayElement = element.find('.current')
      expect(todayElement.text()).toBe('23')
      expect(todayElement.css('background-color')).toBe('rgb(0, 68, 204)')
    })
  })

  afterEach(function () {
    jasmine.clock().uninstall()
    angular.element(document).find('body').remove('.datetimepicker')
  })
})
